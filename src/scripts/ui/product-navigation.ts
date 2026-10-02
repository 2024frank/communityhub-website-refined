/** The narrow layout can show one product at a time without removing the other
 * products from the page's vertical reading order. Its internal reading stops
 * are exhausted before crossing a product boundary. */
interface ProductNavigation {
  enabled(): boolean;
  current(): number;
  count(): number;
  select(index: number): void;
}
const rails = new WeakMap<HTMLElement, ProductNavigation>();
export function registerProductNavigation(section: HTMLElement, navigation: ProductNavigation) {
  rails.set(section, navigation);
}
export function productBoundary(from: HTMLElement | undefined, to: HTMLElement | undefined, direction: number): {section: HTMLElement; direction: number} | null {
  if (from === to) return null;
  const current = from && rails.get(from);
  if (from && current?.enabled()) {
    const next = current.current() + direction;
    if (next >= 0 && next < current.count()) {
      current.select(next);
      return {section: from, direction};
    }
  }
  const destination = to && rails.get(to);
  if (to && destination?.enabled()) {
    destination.select(direction > 0 ? 0 : destination.count() - 1);
    return {section: to, direction};
  }
  return null;
}
