let ele = $0
listeners = getEventListeners(ele)
debug(listeners.click[0].listener)
ele.click();