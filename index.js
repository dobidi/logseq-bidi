import '@logseq/libs';

const graphDocument = window.parent.document;

const setDirAuto = (node) => node.setAttribute('dir', 'auto');
const setDirAutoToAll = (nodes) => nodes.forEach((node) => setDirAuto(node));

const handleLeftRightKey = (e) => {
  if (e.shiftKey || e.ctrlKey) return;
  if (!['ArrowRight', 'ArrowLeft'].includes(e.code)) return;

  if (e.target.tagName !== 'TEXTAREA') return;

  const editorElement = e.target;
  const editorElementEffectiveDirection = window.getComputedStyle(editorElement).direction;

  if (editorElementEffectiveDirection === 'ltr') return;

  e.preventDefault();
  e.stopPropagation();

  const commonKeyboardEventProperties = {
    bubbles: false,
    cancelable: false,
    shiftKey: false,
    ctrlKey: false,
    altKey: false,
    metaKey: false,
  };

  const rightKeyCode = {
    key: 'ArrowRight',
    keyCode: 39,
  };

  const leftKeyCode = {
    key: 'ArrowLeft',
    keyCode: 37,
  };

  const swipedKeyCode = e.code === 'ArrowRight' ? leftKeyCode : rightKeyCode;

  const keyboardEvent = new KeyboardEvent('keydown', {
    ...swipedKeyCode,
    ...commonKeyboardEventProperties,
  });

  // eslint-disable-next-line no-restricted-globals
  top?.dispatchEvent(keyboardEvent);
};

const customBidiStyle = `
.pr-2 {
  padding-right: unset;
  padding-inline-end: 0.5rem;
}

.block-children-container {
  margin-left: unset;
  margin-inline-start: 29px;
}

.block-control-wrap {
  padding-right: unset;
  padding-inline-end: 6px;
}

a.tag {
  unicode-bidi: plaintext;
}

.ls-block :is(h1,h2,h3,h4,h5)::after {
  margin-left: unset;
  margin-inline-start: .5rem;
}

.block-children {
  border-left-color: unset;
  border-left-width: unset !important;
  border-inline-start-color: var(--ls-guideline-color);
  border-inline-start-width: var(--ls-block-bullet-threading-width) !important;
}

.block-children-left-border {
  padding-right: unset;
  left: unset;
  padding-inline-end: 0px;
  inset-inline-start: -1px;
}

.ls-block>div>div.items-center::before {
  right: unset !important;
}

.ls-block>div>div.items-center::after {
  inset-inline-end: 15px !important; 
}

.ls-block .ls-block>div>div.items-center::before {
  pointer-events: unset;
  content: unset;
  left: unset;
  right: unset;
  top: unset;
  bottom: unset;
  position: unset;
  border-left: unset;
  border-bottom: unset;
  border-bottom-left-radius: unset;
}

.ls-block .ls-block>div>div.items-center::after {
  pointer-events: none;
  content: "";
  inset-inline-start: calc(var(--ls-block-bullet-threading-width)*-1);
  inset-inline-end: 20px;
  top: calc(-50% + var(--ls-block-bullet-threading-width)*.5 - 1px);
  bottom: 50%;
  position: absolute;
  border-inline-start: var(--ls-block-bullet-threading-width) solid rgba(0,0,0,0);
  border-bottom: var(--ls-block-bullet-threading-width) solid rgba(0,0,0,0);
  border-end-start-radius: 10px;
}

.ls-block .ls-block:focus-within>div>div.items-center::after {
  border-color: var(--ls-block-bullet-active-color)
}

.ls-block .block-children>.ls-block::before {
  border-left: unset;
  left: unset;
  border-inline-start: var(--ls-block-bullet-threading-width) solid rgba(0,0,0,0);
  inset-inline-start: calc(var(--ls-block-bullet-threading-width)*-1);
}

.ls-block[haschild]>div>.block-content-wrapper::before {
  left: unset;
  inset-inline-start: -21px;
}

@media(max-width: 640px) {
  .ls-block[haschild]>div>.block-content-wrapper::before {
    left: unset;
    inset-inline-start: -11px;
  }
}

.ls-block[haschild=true]>div>.block-content-wrapper::before {
  left: unset;
  inset-inline-start: -14px;
}

.ls-block .block-children {
  border-left-width: unset !important;
  border-left-color: unset;
  border-inline-start-width: 1px !important;
  border-inline-start-color: var(--ls-bullet-threading-background-color);
}

.block-children {
  border-left: unset;
  border-left-color: unset;
  border-inline-start: 1px solid;
  border-inline-start-color: var(--ls-guideline-color,#ddd);
}

@media(max-width: 640px) {
  .ls-block[haschild]>div>.block-content-wrapper::before {
    left: unset;
    inset-inline-start: -11px;
  }
}

.doc-mode .block-children {
  border-left-width: unset !important;
  border-inline-start-width: 0px !important;
}

.block-control .rotating-arrow {
  margin-left: unset;
  margin-inline-start: 2px;
}

.block-control .rotating-arrow>svg {
  margin-left: unset !important;
  margin-inline-start: 0 !important;
}

.block-content-wrapper>div>.block-content>span>span>:first-child::before {
  left: unset;
  inset-inline-start: -8px;
}

.extensions__code-lang {
  margin-left: unset;
  margin-inline-start: 4px;
}

.tippy-tooltip-content>.pr-3 {
  padding-left: unset;
  padding-inline-start: .75rem;
}

.tippy-wrapper>:is(div:first-child,h2:first-child,.block-parents) {
  left: unset;
  inset-inline-start: -0.5em;
 }

:not(.dsl-query)>.custom-query .custom-query-title>.flex-row {
  left: unset;
  inset-inline-start: 24px;
 }

a.tooltip-priority:first-of-type::before {
  margin-left: unset;
  margin-inline-start: .3em;
}

blockquote {
  border-left-color: unset;
  border-left: unset;
  border-inline-start: 4px solid var(--ls-custom-theme-color);
}

.cp__header::after,.cp__right-sidebar-topbar::after {
  left: unset;
  right: unset;
  inset-inline: 0;
}

.embed-page .embed-header .mr-3 {
  margin-right: unset;
  margin-inline-end: 0;
}

.page-properties,.block-properties {
  margin-right: unset;
  margin-inline-end: 0;
  padding-right: unset;
  padding-inline-end: 2rem;
}

.form-checkbox:checked,.form-checkbox:checked:focus {
  margin-right: unset !important;
  margin-inline-end: 5px !important;
}

.extensions__code-lang {
  right: unset;
  inset-inline-end: 1%;
}

@media(min-width: 640px) {
  a.tag[data-ref=fix],a.tag[data-ref=FIX],a.tag[data-ref=Bug],a.tag[data-ref=bug],a.tag[data-ref=BUG],
  a.tag[data-ref=Improvement],a.tag[data-ref=improvement],a.tag[data-ref=perf],a.tag[data-ref=PERF],
  a.tag[data-ref=Feature],a.tag[data-ref=feature],a.tag[data-ref=feat],a.tag[data-ref=FEAT],
  a.tag[data-ref=Style],a.tag[data-ref=style],a.tag[data-ref=STYLE],
  a.tag[data-ref=Chore],a.tag[data-ref=chore],a.tag[data-ref=CHORE],
  a.tag[data-ref=Test],a.tag[data-ref=test],a.tag[data-ref=TEST],
  a.tag[data-ref=refactor],a.tag[data-ref=Refactor],a.tag[data-ref=REFACTOR],
  a.tag[data-ref=Documentation],a.tag[data-ref=documentation],a.tag[data-ref=docs],a.tag[data-ref=DOCS],
  a.tag[data-ref=question],a.tag[data-ref=Question],a.tag[data-ref=QUES],a.tag[data-ref=ques],
  a.tag[data-ref=Idea],a.tag[data-ref=idea],a.tag[data-ref=IDEA] {
    float: inline-end;
  }
}
`;

const applyBidi = () => {
  const cssSelector = 'div.ls-block:not([dir]), div.ls-page-title:not([dir])';

  // initial run on whole document
  setDirAutoToAll(graphDocument.querySelectorAll(cssSelector));

  // Define the callback function
  const processBlocks = (mutationsList) => {
    mutationsList.forEach((mutation) => {
      mutation.addedNodes.forEach((addedNode) => {
        if (addedNode.nodeType !== Node.ELEMENT_NODE) return;

        if (addedNode.classList?.contains('ls-block')) setDirAuto(addedNode);

        const subLsBlocks = addedNode.querySelectorAll(cssSelector);
        setDirAutoToAll(subLsBlocks);
      });
    });
  };

  const observer = new MutationObserver(processBlocks);
  observer.observe(graphDocument, {
    attributes: false,
    childList: true,
    subtree: true,
  });
};

const applyCustomBidiStyle = () => {
  // eslint-disable-next-line no-undef
  logseq.provideStyle(customBidiStyle);
};

const main = () => {
  applyBidi();
  applyCustomBidiStyle();

  graphDocument.addEventListener('keydown', handleLeftRightKey);
};

// eslint-disable-next-line no-undef, no-console
logseq.ready(main).catch(console.error);
