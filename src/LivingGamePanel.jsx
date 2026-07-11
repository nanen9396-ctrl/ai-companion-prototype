import {
  ChefHat,
  Crown,
  Gift,
  Home,
  MapPin,
  Music2,
  Palette,
  Shuffle,
  Sparkles,
} from "lucide-react";
import { livingShopItems } from "./livingGame.js";

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
  pair: "挑出两项，错配不会留下遗憾",
};

const shopCategories = ["外观", "礼物", "布置"];
const decorLabels = {
  "window-lamp": "窗边琥珀灯",
  "blue-wallpaper": "深海壁纸",
  "reading-chair": "共读角落",
};

export function LivingGamePanel({
  mission,
  livingGame,
  selection,
  feedback,
  view,
  giftPreview,
  giftReaction,
  modelSrc,
  onSelectOption,
  onRefreshMission,
  onViewChange,
  onPreviewGift,
  onExperienceGift,
  onOpenPremium,
}) {
  const CategoryIcon = categoryIcons[mission.category] || Sparkles;
  const completed = livingGame.completedIds.includes(mission.id);
  const selectedItem = giftPreview || livingShopItems[0];
  const isGifted = livingGame.giftedIds.includes(selectedItem.id);
  const decorLabel = decorLabels[livingGame.decorId];

  return (
    <section className={`living-game ${livingGame.decorId ? `decor-${livingGame.decorId}` : ""}`} aria-label="共同生活">
      <section className="living-hero" aria-labelledby="living-title">
        <img className="living-hero-background" src={modelSrc} alt="夏萧因在共同小屋等你" />
        <div className="living-hero-scrim" />
        <div className="living-hero-copy">
          <span className="living-eyebrow">共同生活</span>
          <h1 id="living-title">和他一起，过一段小日子</h1>
          <p>不必完成什么大事。把今晚的一点空闲，留给彼此就好。</p>
        </div>
        <div className="living-companion-card" aria-label={`${mission.title}中的${"夏萧因"}`}>
          <img src={modelSrc} alt="夏萧因" />
          <span>{decorLabel ? `${decorLabel}已布置` : "在小屋等你"}</span>
        </div>
      </section>

      <div className="living-switch" role="tablist" aria-label="共同生活内容">
        <button className={view === "mission" ? "active" : ""} type="button" onClick={() => onViewChange("mission")}>
          今日小事
        </button>
        <button className={view === "shop" ? "active" : ""} type="button" onClick={() => onViewChange("shop")}>
          心意小铺
        </button>
      </div>

      {view === "mission" ? (
        <section className="living-mission" aria-labelledby="mission-title">
          <div className="living-mission-heading">
            <div>
              <span className="living-category">
                <CategoryIcon size={15} />
                {mission.category}
              </span>
              <h2 id="mission-title">{mission.title}</h2>
              <p>{mission.scene}</p>
            </div>
            <button className="living-refresh" type="button" onClick={onRefreshMission} aria-label="换一件小事" title="换一件小事">
              <Shuffle size={19} />
            </button>
          </div>

          {completed ? (
            <div className="living-complete">
              <Sparkles size={22} />
              <div>
                <strong>今晚的小事，已经被好好收下了。</strong>
                <p>获得生活印记「{mission.keepsake}」</p>
              </div>
              <button className="secondary-button" type="button" onClick={onRefreshMission}>
                再来一件
              </button>
            </div>
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
                      {mission.kind === "sequence" && <small>{index + 1}</small>}
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>
              <p className={`living-feedback ${feedback ? "visible" : ""}`} aria-live="polite">
                {feedback || " "}
              </p>
            </>
          )}
        </section>
      ) : (
        <section className="living-shop" aria-labelledby="shop-title">
          <div className="living-shop-heading">
            <div>
              <span className="living-eyebrow">情感化内购</span>
              <h2 id="shop-title">心意小铺</h2>
              <p>这里不卖数值，只收下你想为他准备的一点心意。</p>
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
                {livingShopItems
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <button
                      className={selectedItem.id === item.id ? "shop-item selected" : "shop-item"}
                      key={item.id}
                      type="button"
                      onClick={() => onPreviewGift(item)}
                    >
                      <span className={`shop-item-icon ${item.category}`}>
                        {item.category === "礼物" ? <Gift size={19} /> : item.category === "外观" ? <Sparkles size={19} /> : <Home size={19} />}
                      </span>
                      <strong>{item.name}</strong>
                      <small>预计 {item.price}</small>
                    </button>
                  ))}
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
            <button className="primary-button" type="button" onClick={() => onExperienceGift(selectedItem)}>
              {isGifted ? "重温心意" : "先行体验"}
            </button>
          </section>
          <p className={`gift-reaction ${giftReaction ? "visible" : ""}`}>{giftReaction || " "}</p>
          <p className="shop-disclaimer">当前为内容体验入口，实际购买与支付会在高级版服务开放时启用。</p>
        </section>
      )}

      <section className="living-collection" aria-label="共同生活收藏">
        <div>
          <span>共同完成</span>
          <strong>{livingGame.completedIds.length}</strong>
          <small>件小事</small>
        </div>
        <div>
          <span>生活印记</span>
          <strong>{livingGame.keepsakes.length}</strong>
          <small>枚收藏</small>
        </div>
        <p>不同题材会轮换出现，最近完成的委托不会立刻重复。</p>
      </section>
    </section>
  );
}
