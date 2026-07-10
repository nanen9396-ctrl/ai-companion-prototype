import { makeId, nowIso, readStore, writeStore } from "./jsonStore.js";

function normalizeName(name) {
  return String(name || "").trim();
}

export async function listDevices(userId) {
  const store = await readStore();
  return store.devices.filter((device) => device.user_id === userId);
}

export async function createDevice(userId, input) {
  const now = nowIso();
  const device = {
    id: makeId("dev"),
    user_id: userId,
    device_name: normalizeName(input.device_name),
    device_type: String(input.device_type || "").trim(),
    status: String(input.status || "off"),
    location: String(input.location || "").trim(),
    external_device_id: String(input.external_device_id || "").trim(),
    created_at: now,
    updated_at: now,
  };

  if (!device.device_name || !device.device_type) {
    throw new Error("设备名称和类型不能为空");
  }

  const store = await readStore();
  store.devices.push(device);
  await writeStore(store);
  return device;
}

export async function updateDevice(userId, id, input) {
  const store = await readStore();
  const index = store.devices.findIndex((device) => device.user_id === userId && device.id === id);
  if (index < 0) return null;
  const current = store.devices[index];
  store.devices[index] = {
    ...current,
    device_name: input.device_name === undefined ? current.device_name : normalizeName(input.device_name),
    device_type: input.device_type === undefined ? current.device_type : String(input.device_type || "").trim(),
    status: input.status === undefined ? current.status : String(input.status || "off"),
    location: input.location === undefined ? current.location : String(input.location || "").trim(),
    external_device_id:
      input.external_device_id === undefined
        ? current.external_device_id
        : String(input.external_device_id || "").trim(),
    updated_at: nowIso(),
  };
  await writeStore(store);
  return store.devices[index];
}

export async function deleteDevice(userId, id) {
  const store = await readStore();
  const before = store.devices.length;
  store.devices = store.devices.filter((device) => !(device.user_id === userId && device.id === id));
  await writeStore(store);
  return store.devices.length !== before;
}

export async function findDeviceByName(userId, deviceName) {
  const wanted = normalizeName(deviceName).toLowerCase();
  const devices = await listDevices(userId);
  return devices.find((device) => device.device_name.toLowerCase() === wanted) || null;
}

export async function executeDeviceControl(userId, deviceName, action) {
  const store = await readStore();
  const wanted = normalizeName(deviceName).toLowerCase();
  const index = store.devices.findIndex(
    (device) => device.user_id === userId && device.device_name.toLowerCase() === wanted,
  );

  if (index < 0) {
    return `没有找到名为 ${deviceName} 的设备，请先添加设备。`;
  }

  const device = store.devices[index];
  const normalizedAction = String(action || "").trim().toLowerCase();
  let status;
  let result;

  if (normalizedAction === "turn_on") {
    status = "on";
    result = `${device.device_name}已打开。`;
  } else if (normalizedAction === "turn_off") {
    status = "off";
    result = `${device.device_name}已关闭。`;
  } else if (normalizedAction.startsWith("set_temperature")) {
    const temperature = normalizedAction.match(/-?\d+(\.\d+)?/)?.[0];
    if (!temperature) {
      return "请告诉我想把温度设置到多少度。";
    }
    status = `${temperature}°C`;
    result = `${device.device_name}已调到${temperature}度。`;
  } else {
    return "暂不支持该操作。";
  }

  store.devices[index] = {
    ...device,
    status,
    updated_at: nowIso(),
  };
  await writeStore(store);
  return result;
}
