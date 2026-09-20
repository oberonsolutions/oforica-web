(function applyCopy() {
  const catalog = window.OFORICA_COPY;
  if (!catalog) return;

  const locale = catalog.defaultLocale;
  const strings = catalog.locales[locale];
  if (!strings) return;

  document.documentElement.lang = locale;
  document.title = strings.title;

  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", strings.metaDescription);

  document.querySelectorAll("[data-i18n]").forEach(function (node) {
    const value = strings[node.getAttribute("data-i18n")];
    if (typeof value === "string") node.textContent = value;
  });

  document.querySelectorAll("[data-i18n-list]").forEach(function (node) {
    const items = strings[node.getAttribute("data-i18n-list")];
    if (!Array.isArray(items)) return;
    node.replaceChildren.apply(
      node,
      items.map(function (item) {
        const li = document.createElement("li");
        li.textContent = item;
        return li;
      })
    );
  });
})();
