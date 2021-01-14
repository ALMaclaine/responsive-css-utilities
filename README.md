# Usage

To use this package effectively you'll want to pair it with the following libraries and this code snippet:

## Packages

- musical-ratios
- css-custom-properties
- rhythmic-breakpoints
- rhythmic-scale
- empxrem

## Code Snippet

You'll need this to run at app start up.

```js
import {intervalToRatio} from 'musical-ratios';
import cssProps from 'css-custom-properties';
import {RhythmicBreakpoints} from 'rhythmic-breakpoints';
import {RhythmicScale} from 'rhythmic-scale';
import {ensureNotPxRem} from "empxrem";

const baseFont = 16;

export const mediaManager = RhythmicBreakpoints.createDefaultInstance();
export const handleUpdateBaseFont = () => mediaManager.handleUpdateBaseFont();

const rhythmicScale = new RhythmicScale({baseFont});

function handleBPChange() {
    const ratio = intervalToRatio(mediaManager.getBpInterval(mediaManager.active));
    const cssVars = {};

    for (let i = 0; i <= 4; i++) {
        const scaledStyles = rhythmicScale.scaledStyles(ratio, -i, .9);
        const size = `n${i}`;
        cssVars[`modular-break-pt-${size}`] = ensureNotPxRem(mediaManager.shiftBreakpoint(mediaManager.active, -i), baseFont);
        cssVars[`modular-size-${size}`] = scaledStyles.size;
        cssVars[`modular-line-height-${size}`] = scaledStyles.lineHeight;
    }
    for (let i = 0; i <= 10; i++) {
        const scaledStyles = rhythmicScale.scaledStyles(ratio, i, .9);
        cssVars[`modular-break-pt-l${i}`] = ensureNotPxRem(mediaManager.shiftBreakpoint(mediaManager.active, i), baseFont);
        cssVars[`modular-size-l${i}`] = scaledStyles.size;
        cssVars[`modular-line-height-l${i}`] = scaledStyles.lineHeight;
    }
    cssProps.set(cssVars);
}

handleBPChange();

mediaManager.addEventListener('change', () => {
    handleBPChange()
});

```
