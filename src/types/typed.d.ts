declare module 'typed.js' {
  export interface TypedOptions {
    strings?: string[];
    stringsElement?: string;
    typeSpeed?: number;
    startDelay?: number;
    backSpeed?: number;
    smartBackspace?: boolean;
    shuffle?: boolean;
    backDelay?: number;
    fadeOut?: boolean;
    fadeOutClass?: string;
    fadeOutDelay?: number;
    loop?: boolean;
    loopCount?: number;
    showCursor?: boolean;
    cursorChar?: string;
    autoInsertCss?: boolean;
    attr?: string;
    bindInputFocusEvents?: boolean;
    contentType?: string;
    onBegin?: (self: Typed) => void;
    onComplete?: (self: Typed) => void;
    preStringTyped?: (arrayPos: number, self: Typed) => void;
    onStringTyped?: (arrayPos: number, self: Typed) => void;
    onLastStringBackspaced?: (self: Typed) => void;
    onTypingPaused?: (arrayPos: number, self: Typed) => void;
    onTypingResumed?: (arrayPos: number, self: Typed) => void;
    onReset?: (self: Typed) => void;
    onStop?: (arrayPos: number, self: Typed) => void;
    onStart?: (arrayPos: number, self: Typed) => void;
    onDestroy?: (self: Typed) => void;
  }

  export default class Typed {
    constructor(element: string | Element, options?: TypedOptions);
    toggle(): void;
    stop(): void;
    start(): void;
    destroy(): void;
    reset(restart?: boolean): void;
  }
}

