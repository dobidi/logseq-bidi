const graphDocument = window.parent.document

const setDirAuto = (node) => node.setAttribute('dir', 'auto')
const setDirAutoToAll = (nodes) => nodes.forEach((node) => setDirAuto(node))



const applyBidi = () => {
  const cssSelector = 'div.ls-block:not([dir]), div.ls-page-title:not([dir])'
  
  // initial run on whole document
  setDirAutoToAll(graphDocument.querySelectorAll(cssSelector))

  // Define the callback function
  const processBlocks = (mutationsList, observer) => {
    for(let mutation of mutationsList) {
      
      if (mutation.type !== 'childList') continue;

      for(let addedNode of mutation.addedNodes) {
        console.log(addedNode)
        if (addedNode.classList?.contains('ls-block')) setDirAuto(addedNode)
        
        subLsBlocks = addedNode.querySelectorAll(cssSelector)
        setDirAutoToAll(subLsBlocks)
      }
    }
  };

  const observer = new MutationObserver(processBlocks);
  observer.observe(graphDocument, { childList: true, subtree: true });
}

const main = (e) => {
  applyBidi()
}

logseq.ready(main).catch(console.error)
