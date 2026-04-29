export function renderLandMarketBoard({
  desk,
  selectedLot,
  context,
  landRegistry = [],
  districtTrendLabel,
  renderMapBase,
  escapeHtml,
  showSoldStrip = true
}) {
  const auctionLots = (desk?.lots || []).map((lot) => {
    const selected = selectedLot?.id === lot.id;
    const expensive = lot.deposit > context.visible.cash;
    return `
      <button
        class="lot-node auction ${selected ? "active" : ""} ${expensive ? "expensive" : ""}"
        type="button"
        data-lot-id="${escapeHtml(lot.id)}"
        style="--x:${lot.x}%;--y:${lot.y}%;"
      >
        <strong>${escapeHtml(lot.title)}</strong>
        <small>${lot.size}亩｜起${lot.startPrice}｜${escapeHtml(districtTrendLabel(lot.district))}</small>
      </button>
    `;
  }).join("");
  const ownedMapNodes = [...landRegistry]
    .filter((record) => record.ownedByPlayer)
    .slice(0, 8)
    .map((record) => `
      <button
        class="lot-node owned"
        type="button"
        style="--x:${record.x || 50}%;--y:${record.y || 50}%;"
        disabled
      >
        <strong>${escapeHtml(record.title)}</strong>
        <small>自有｜成交${Math.round(record.finalPrice || record.startPrice || 0)}</small>
      </button>
    `).join("");
  const soldMapNodes = [...landRegistry]
    .filter((record) => !record.ownedByPlayer)
    .slice(0, 8)
    .map((record) => `
      <button
        class="lot-node sold-other"
        type="button"
        style="--x:${record.x || 50}%;--y:${record.y || 50}%;"
        disabled
      >
        <strong>${escapeHtml(record.title)}</strong>
        <small>${escapeHtml(record.winner || "别人")}｜成交${Math.round(record.finalPrice || record.startPrice || 0)}</small>
      </button>
    `).join("");
  const soldRecords = [...landRegistry].slice(0, 5);
  const soldStrip = showSoldStrip && soldRecords.length
    ? `
      <div class="sold-lot-strip">
        <strong>最近成交</strong>
        ${soldRecords.map((record) => `
          <span>${escapeHtml(record.title)} -> ${escapeHtml(record.winner || "未知买家")}｜${Math.round(record.finalPrice || record.startPrice || 0)}</span>
        `).join("")}
      </div>
    `
    : "";
  return `${renderMapBase(`
    <span class="map-legend auction">土拍</span>
    ${auctionLots}
    ${ownedMapNodes}
    ${soldMapNodes}
  `, "land-market-map")}${soldStrip}`;
}
