# Page Entry Animation Intent

## Purpose

The project should use one consistent entry-animation experience for both normal page navigation and the initial landing-page transition.

When the landing page exits, the page content should enter using the same animation system used after navigating between pages. The landing transition should not create a separate or competing entry-animation flow.

## Intended animation triggers

The shared entry-animation flow should be triggered by either of these events:

1. A client-side navigation finishes successfully.
2. The landing-page transition finishes exiting.

Both events represent the same state: the destination page is ready to be revealed. They should therefore invoke the same entry-animation behavior.

## Expected behavior

- Entry animations run once per page-entry event.
- The landing overlay remains responsible only for its own exit animation.
- Content that has a page-entry animation starts hidden while the landing intro is active.
- The hidden state is applied during render, before the browser paints, so content does not flash visibly and then disappear when the entry animation begins.
- The landing intro exit releases the shared entry trigger, which starts the content animation from hidden to visible.
- Page sections do not independently start entry animations while the landing overlay is still visible.
- Navigation and landing-page entry animations use the same timing and visual language.
- Re-rendering, ScrollTrigger refreshes, or responsive updates must not replay an entry animation unintentionally.
- Existing scroll-driven animations remain separate from one-time page-entry animations.

## Initial visual state

Any component controlled by the shared entry animation must render its initial hidden visual state while the landing intro is active. For text, this can be an opacity-based hidden state that keeps the content in the DOM for accessibility and SEO.

The animation should then transition that content to its visible state after the shared page-entry signal. Starting from a visible state and calling `gsap.from()` later is not acceptable, because it produces a visible-to-hidden flash before the animation plays.

## Entry-animation implementation warning

Whenever a new component receives a page-entry animation, its rendered markup must already contain the matching hidden initial state. Do not rely on GSAP or Motion to hide a visible element after the page-entry event fires.

For example, an element animated from `opacity: 0` must also render with an initial opacity of zero while the entry event is pending. This applies to images, captions, headings, paragraphs, cards, and any other visible element.

Otherwise, the following visual bug can occur:

```text
component renders visibly
        ↓
page-entry event fires
        ↓
animation applies opacity: 0
        ↓
component disappears and animates back in
```

The safe sequence is:

```text
component renders hidden
        ↓
page-entry event fires
        ↓
animation reveals the component
```

The initial hidden state should be render-time CSS or an equivalent style, while the entry animation should control only the transition to the visible state.

## Landing-exit callback warning

The midpoint page-entry signal must not call the landing component's actual completion callback.

If the midpoint signal calls `onComplete`, it sets `introVisible` to `false` immediately. That unmounts `LandingIntro` while its GSAP timeline is still running. The component cleanup then calls `ctx.revert()`, which kills the overlay tween before it reaches the end, causing the landing movement to stop or disappear abruptly.

The two lifecycle callbacks must remain separate:

- Midpoint callback: trigger page-entry animations.
- Final tween completion: unmount the landing intro.

The current implementation follows this separation. `LandingIntro` calls `notifyLandingEntry` through a GSAP timeline position callback `0.3s` before the overlay exit finishes. The landing intro's normal `onComplete` remains attached to the overlay tween and fires only after the full movement completes. The provider also guards the landing signal so it can be emitted only once.

## Current implementation

The shared lifecycle is implemented by `components/PageEntryProvider.tsx` and mounted around the application in `pages/_app.tsx`.

The provider:

- Tracks whether the landing intro is active.
- Emits an entry signal when the landing intro changes from active to complete.
- Listens for Next.js `routeChangeComplete` events and emits an entry signal after successful client-side navigation.
- Ignores hash-only changes because they do not represent a new page entry.
- Clears pending navigation state when a route change errors or is canceled.
- Assigns every entry signal a unique numeric ID, route key, and source.

Animation components use `usePageEntry()` and depend on the unique entry ID. Their GSAP contexts use cleanup and `revertOnUpdate` so a new entry cannot leave behind timelines or ScrollTriggers from the previous one.

The current shared consumers include the homepage GSAP sections, `Paragraph`, and `MaskTextAnimation`. These components wait for the entry ID before starting and render their initial hidden state while the landing intro is active.

Scroll position is handled separately by `ScrollReset` and `SmoothScroll`: navigation resets the scroll position, while the page-entry provider controls when visual entry animations begin.

## Lifecycle model

```text
Landing transition exits ─┐
                         ├─> shared page-entry trigger ─> page entry animations
Route navigation ends ───┘
```

The shared trigger should be emitted only after the relevant destination content is mounted and ready. Animation consumers should subscribe to that trigger or receive an equivalent shared entry state, then clean up their animation context before a new entry animation is created.

## Important distinction

The landing transition is not itself a page-entry animation. It is a blocking visual layer that reveals the page. Once it has exited, it should signal the same page-entry lifecycle used by completed navigation.

This prevents two separate animation paths from running at different times and avoids duplicate or overlapping entry animations.

## Scope

This document records the intended architecture only. It does not prescribe a particular event name or implementation detail. Any future implementation should preserve the single shared trigger and the once-per-entry behavior described above.
