/**
 * Portfolio filter — client-side category filtering with CSS transitions.
 * Call init() after the DOM is ready.
 */

export function init(): void {
  const tags = document.querySelectorAll<HTMLElement>('[data-filter]');
  const cards = document.querySelectorAll<HTMLElement>('#portfolio-grid [data-category]');

  if (!tags.length || !cards.length) return;

  // Ensure transition styles are applied to every card
  cards.forEach((card) => {
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  });

  function setActiveTag(activeTag: HTMLElement): void {
    tags.forEach((tag) => {
      const isActive = tag === activeTag;
      tag.dataset.active = isActive ? 'true' : 'false';

      // Mirror the Tag component's active/inactive class sets
      if (isActive) {
        tag.classList.remove(
          'border-white/20',
          'text-[var(--color-text-muted,rgba(255,255,255,0.5))]',
          'hover:border-white/50',
          'hover:text-white/80',
        );
        tag.classList.add('border-white', 'text-white', 'bg-white/10');
      } else {
        tag.classList.remove('border-white', 'text-white', 'bg-white/10');
        tag.classList.add(
          'border-white/20',
          'text-[var(--color-text-muted,rgba(255,255,255,0.5))]',
          'hover:border-white/50',
          'hover:text-white/80',
        );
      }
    });
  }

  function filterCards(filter: string): void {
    cards.forEach((card) => {
      const category = card.dataset.category ?? '';
      const matches = filter === 'all' || category === filter;

      if (matches) {
        // Reveal: make visible first, then animate in
        card.style.display = 'block';
        // Force a reflow so the transition actually runs
        void card.offsetHeight;
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      } else {
        // Hide: animate out, then set display:none after transition ends
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';

        const onTransitionEnd = () => {
          // Only hide if still filtered out (user might have clicked again)
          if (card.style.opacity === '0') {
            card.style.display = 'none';
          }
          card.removeEventListener('transitionend', onTransitionEnd);
        };

        card.addEventListener('transitionend', onTransitionEnd, { once: true });
      }
    });
  }

  tags.forEach((tag) => {
    tag.addEventListener('click', () => {
      const filter = tag.dataset.filter ?? 'all';
      setActiveTag(tag);
      filterCards(filter);
    });
  });
}
