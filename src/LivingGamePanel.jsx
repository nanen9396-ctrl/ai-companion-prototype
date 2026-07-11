import { useState } from "react";
import {
  BedDouble,
  Check,
  ChefHat,
  Crown,
  Gift,
  Home,
  Lamp,
  MapPin,
  Music2,
  Palette,
  RefreshCw,
  Sparkles,
  X,
} from "lucide-react";
import { ClickSpark } from "./ClickSpark.jsx";
import { LivingMiniGame } from "./LivingMiniGame.jsx";
import { houseRooms, livingShopItems, miniGameConfigs, missionLocations } from "./livingGame.js";

const roomIcons = {
  living: Home,
  kitchen: ChefHat,
  wardrobe: Palette,
  balcony: MapPin,
  bedroom: BedDouble,
};

const categoryIcons = {
  料理: ChefHat,
  设计: Palette,
  音乐: Music2,
  居家: Home,
  出行: MapPin,
  异境: Sparkles,
};

const interactionHints = {
  choice: "选一种你想和他一起留下的方式",
  sequence: "按顺序完成，选错会从头再来",
  pair: "挑出两项，错配后可以重新选择",
};

const outfitAssets = {
  home: "/assets/living-outfit-home.png",
  "moon-coat": "/assets/living-outfit-moon.png",
  "silver-hairpin": "/assets/living-outfit-hairpin.png",
  "evening-suit": "/assets/living-outfit-evening.png",
};

const shopCategories = ["外观", "礼物", "布置"];

const defaultOutfit = {
  id: "home",
  name: "夜居衬衫",
  detail: "他在小屋里最常穿的那一套。",
};

function itemActionLabel(item, active) {
  if (active) return "已在小屋中";
  if (item.category === "外观") return "换上看看";
  if (item.category === "礼物") return "送给他";
  return "布置小屋";
}

export function LivingGamePanel({
  mission,
  visibleMissions,
  livingGame,
  selection,
  feedback,
  view,
  missionOpen,
  giftPreview,
  giftReaction,
  onSelectOption,
  onChangeRoom,
  onOpenMission,
  onCloseMission,
  onRefreshMissions,
  onViewChange,
  onPreviewGift,
  onExperienceGift,
  onCompleteMiniGame,
  onSelectOwnedOutfit,
  onOpenPremium,
}) {
  const [closetOpen, setClosetOpen] = useState(false);
  const activeRoom = houseRooms.find((room) => room.id === livingGame.activeRoom) || houseRooms[0];
  const RoomIcon = roomIcons[activeRoom.id];
  const CategoryIcon = categoryIcons[mission.category] || Sparkles;
  const completed = livingGame.completedIds.includes(mission.id);
  const selectedItem = giftPreview || livingShopItems[0];
  const previewOutfitId = giftPreview?.category === "外观" ? giftPreview.id : livingGame.outfitId;
  const characterSrc = outfitAssets[previewOutfitId] || outfitAssets.home;
  const giftItem = giftPreview?.category === "礼物"
    ? giftPreview
    : livingShopItems.find((item) => item.id === livingGame.giftId);
  const decorItem = giftPreview?.category === "布置"
    ? giftPreview
    : livingShopItems.find((item) => item.id === livingGame.decorId);
  const showGift = giftItem?.sceneRoom === activeRoom.id;
  const showDecor = decorItem?.sceneRoom === activeRoom.id;
  const ownedOutfits = [
    defaultOutfit,
    ...livingShopItems.filter((item) => item.category === "外观" && livingGame.giftedIds.includes(item.id)),
  ];
  const hasMiniGame = Boolean(miniGameConfigs[mission.id]);

  function isItemActive(item) {
    if (item.category === "外观") return livingGame.outfitId === item.id;
    if (item.category === "礼物") return livingGame.giftId === item.id;
    return livingGame.decorId === item.id;
  }

  return (
    <section className="living-game" aria-label="共同生活模拟小屋">
      <ClickSpark>
        <section
          className={`living-house-stage room-${activeRoom.id} ${showDecor ? `preview-decor-${decorItem.id}` : ""}`}
          aria-labelledby="living-house-title"
        >
          <img className="house-map" src="/assets/living-house-v2.png" alt="包含客厅、厨房、衣帽间、阳台和卧室的共同小屋" />
          <div className="house-vignette" />

          <header className="house-toolbar">
            <div>
              <span>共同生活</span>
              <h1 id="living-house-title">{activeRoom.label}</h1>
              <p>{activeRoom.note}</p>
            </div>
            <button type="button" onClick={onRefreshMissions} aria-label="刷新当前房间的小事件" title="换一批小事件">
              <RefreshCw size={18} />
            </button>
          </header>

          <span className="house-character-shadow" aria-hidden="true" />
          <img className="house-character" src={characterSrc} alt={`夏萧因在${activeRoom.label}中`} />

          {showGift && (
            <div className={`house-gift-layer gift-${giftItem.id}`} aria-label={`${giftItem.name}已放入小屋`}>
              <Gift size={22} />
              <span>{giftItem.name}</span>
            </div>
          )}

          {showDecor && (
            <div className={`house-decor-layer decor-${decorItem.id}`} aria-label={`${decorItem.name}预览`}>
              {decorItem.id === "window-lamp" ? <Lamp size={23} /> : <Home size={23} />}
              <span>{decorItem.name}</span>
            </div>
          )}

          {view === "mission" && visibleMissions.map((item, index) => {
            const location = missionLocations[item.id];
            const isDone = livingGame.completedIds.includes(item.id);
            return (
              <button
                className={`house-hotspot ${isDone ? "done" : ""}`}
                style={{ "--hotspot-x": `${location.x}%`, "--hotspot-y": `${location.y}%`, "--hotspot-delay": `${index * 60}ms` }}
                key={item.id}
                type="button"
                onClick={() => onOpenMission(item.id)}
                aria-label={`${location.label}：${item.title}${isDone ? "，已完成" : ""}`}
              >
                <span className="hotspot-pulse" />
                <span className="hotspot-label">{isDone ? "已完成" : location.label}</span>
              </button>
            );
          })}

          {view === "mission" && activeRoom.id === "bedroom" && (
            <>
              <button
                className={`bedroom-closet-trigger ${closetOpen ? "active" : ""}`}
                type="button"
                onClick={() => setClosetOpen((current) => !current)}
                aria-expanded={closetOpen}
              >
                <Palette size={17} />
                打开衣橱
              </button>
              {closetOpen && (
                <aside className="bedroom-closet" aria-label="卧室衣橱">
                  <header>
                    <div>
                      <strong>他的衣橱</strong>
                      <span>心意小铺中的服饰会收进这里</span>
                    </div>
                    <button type="button" onClick={() => setClosetOpen(false)} aria-label="收起衣橱">
                      <X size={17} />
                    </button>
                  </header>
                  <div className="bedroom-outfits">
                    {ownedOutfits.map((item) => {
                      const active = livingGame.outfitId === item.id;
                      return (
                        <button
                          className={active ? "active" : ""}
                          data-closet-outfit={item.id}
                          key={item.id}
                          type="button"
                          onClick={() => onSelectOwnedOutfit(item.id)}
                          aria-pressed={active}
                        >
                          <span><img src={outfitAssets[item.id]} alt="" /></span>
                          <strong>{item.name}</strong>
                          <small>{active ? "正在穿" : "换上"}</small>
                        </button>
                      );
                    })}
                  </div>
                </aside>
              )}
            </>
          )}

          <nav className="house-room-nav" aria-label="切换房间">
            {houseRooms.map((room) => {
              const Icon = roomIcons[room.id];
              return (
                <button
                  className={room.id === activeRoom.id ? "active" : ""}
                  key={room.id}
                  type="button"
                  onClick={() => {
                    setClosetOpen(false);
                    onChangeRoom(room.id);
                  }}
                  aria-pressed={room.id === activeRoom.id}
                >
                  <Icon size={17} />
                  <span>{room.label}</span>
                </button>
              );
            })}
          </nav>
        </section>
      </ClickSpark>

      <div className="living-mode-switch" role="tablist" aria-label="共同生活内容">
        <button className={view === "mission" ? "active" : ""} type="button" onClick={() => onViewChange("mission")}>
          小屋
        </button>
        <button className={view === "shop" ? "active" : ""} type="button" onClick={() => onViewChange("shop")}>
          心意小铺
        </button>
      </div>

      {view === "mission" && (
        <>
          <section className={`mission-drawer ${missionOpen ? "open" : ""}`} aria-hidden={!missionOpen}>
            <div className="mission-drawer-handle" />
            <div className="living-mission-heading">
              <div>
                <span className="living-category">
                  <CategoryIcon size={15} />
                  {mission.category}
                </span>
                <h2>{mission.title}</h2>
                <p>{mission.scene}</p>
              </div>
              <button type="button" onClick={onCloseMission} aria-label="收起当前事件">
                <X size={19} />
              </button>
            </div>

            {completed ? (
              <div className="living-complete">
                <Sparkles size={21} />
                <div>
                  <strong>这件小事，已经被好好收下了。</strong>
                  <p>获得生活印记「{mission.keepsake}」</p>
                </div>
                <button className="secondary-button" type="button" onClick={onCloseMission}>回到小屋</button>
              </div>
            ) : (
              <>
                {hasMiniGame ? (
                  <LivingMiniGame key={mission.id} missionId={mission.id} onComplete={onCompleteMiniGame} />
                ) : (
                  <>
                    <div className="living-prompt">
                      <strong>{mission.prompt}</strong>
                      <span>{interactionHints[mission.kind]}</span>
                    </div>
                    <div className={`living-options ${mission.kind}`}>
                      {mission.options.map((option, index) => {
                        const selected = selection.includes(index);
                        return (
                          <button
                            className={selected ? "selected" : ""}
                            key={option}
                            type="button"
                            onClick={() => onSelectOption(index)}
                            aria-pressed={selected}
                          >
                            {mission.kind === "sequence" && <small>{selection.length + 1}</small>}
                            <span>{option}</span>
                          </button>
                        );
                      })}
                    </div>
                    <p className={`living-feedback ${feedback ? "visible" : ""}`} aria-live="polite">{feedback || " "}</p>
                  </>
                )}
              </>
            )}
          </section>

          {!missionOpen && (
            <section className="house-idle-note" aria-live="polite">
              <RoomIcon size={18} />
              <div>
                <strong>{visibleMissions.length} 件小事正在{activeRoom.label}等你</strong>
                <span>点击画面中发光的物件开始。</span>
              </div>
              <small>{livingGame.keepsakes.length} 枚生活印记</small>
            </section>
          )}
        </>
      )}

      {view === "shop" && (
        <section className="living-shop" aria-labelledby="shop-title">
          <div className="living-shop-heading">
            <div>
              <span>场景内实时预览</span>
              <h2 id="shop-title">心意小铺</h2>
              <p>选择外观、礼物或布置，变化会先出现在上方小屋中。</p>
            </div>
            <button className="premium-badge" type="button" onClick={onOpenPremium}>
              <Crown size={16} />
              高级版
            </button>
          </div>

          {shopCategories.map((category) => (
            <section className="shop-row" key={category} aria-label={category}>
              <h3>{category}</h3>
              <div className="shop-items">
                {livingShopItems.filter((item) => item.category === category).map((item) => {
                  const active = isItemActive(item);
                  return (
                    <button
                      className={`${selectedItem.id === item.id ? "shop-item selected" : "shop-item"} ${active ? "equipped" : ""}`}
                      data-shop-id={item.id}
                      key={item.id}
                      type="button"
                      onClick={() => onPreviewGift(item)}
                    >
                      <span className={`shop-item-icon ${item.category}`}>
                        {active ? <Check size={18} /> : item.category === "礼物" ? <Gift size={18} /> : item.category === "外观" ? <Sparkles size={18} /> : <Home size={18} />}
                      </span>
                      <strong>{item.name}</strong>
                      <small>预计 {item.price}</small>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}

          <section className="gift-preview" aria-live="polite">
            <span className={`shop-item-icon ${selectedItem.category}`}>
              {selectedItem.category === "礼物" ? <Gift size={20} /> : selectedItem.category === "外观" ? <Sparkles size={20} /> : <Home size={20} />}
            </span>
            <div>
              <strong>{selectedItem.name}</strong>
              <p>{selectedItem.detail}</p>
            </div>
            <button className="primary-button" type="button" onClick={() => onExperienceGift(selectedItem)} disabled={isItemActive(selectedItem)}>
              {itemActionLabel(selectedItem, isItemActive(selectedItem))}
            </button>
          </section>
          <p className={`gift-reaction ${giftReaction ? "visible" : ""}`}>{giftReaction || " "}</p>
          <p className="shop-disclaimer">当前为内容体验入口，实际购买与支付会在高级版服务开放时启用。</p>
        </section>
      )}
    </section>
  );
}
