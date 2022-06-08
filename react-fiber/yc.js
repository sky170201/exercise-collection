
function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child => 
                typeof child === 'object'
                ? child
                : createTextElement(child) // 创建文本节点
            )
        }
    }
}

function createTextElement(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: []
        }
    }
}

let nextFiberReconcileWork = null;
let wipRoot = null;

// schedule 
function workLoop (deadline) {
    let shouldYield = false;
    while (nextFiberReconcileWork && !shouldYield) {
        nextFiberReconcileWork = performNextWork(nextFiberReconcileWork);
        shouldYield = deadline.timeRemaining() < 1;
    }

    if (!nextFiberReconcileWork) {
        commitRoot();
    }

    requestIdleCallback(workLoop)
}

function commitRoot() {
    commitWork(wipRoot && wipRoot.child);
    wipRoot = null
}

function commitWork(fiber) {
    if (!fiber) {
        return
    }

    let domParentFiber = fiber.return
    while (!domParentFiber.dom) {
        domParentFiber = domParentFiber.return
    }
    const domParent = domParentFiber.dom

    if (
        fiber.effectTag === "PLACEMENT" &&
        fiber.dom != null
    ) {
        domParent.appendChild(fiber.dom)
    } 
    commitWork(fiber.child)
    commitWork(fiber.sibling)
}

// reconcile
function performNextWork(fiber) {

    reconcile(fiber);

    if (fiber.child) {
        return fiber.child;
    }
    let nextFiber = fiber;
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling;
        }
        nextFiber = nextFiber.return;
    }
}

function reconcile(fiber) {
    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }
    reconcileChildren(fiber, fiber.props.children)
}

// 创建真实节点
function createDom(fiber) {
    const dom = fiber.type == "TEXT_ELEMENT" ? document.createTextNode("") : document.createElement(fiber.type);

    for (const prop in fiber.props) {
        setAttribute(dom, prop, fiber.props[prop]);
    }

    return dom;
}

function isEventListenerAttr(key, value) {
    return typeof value == 'function' && key.startsWith('on');
}

function isStyleAttr(key, value) {
    return key == 'style' && typeof value == 'object';
}

function isPlainAttr(key, value) {
    return typeof value != 'object' && typeof value != 'function';
}

// 设置属性
const setAttribute = (dom, key, value) => {
    if (key === 'children') {
        return;
    }

    if (key === 'nodeValue') {
        dom.textContent = value;
    } else if (isEventListenerAttr(key, value)) {
        const eventType = key.slice(2).toLowerCase();
        dom.addEventListener(eventType, value);
    } else if (isStyleAttr(key, value)) {
        Object.assign(dom.style, value);
    } else if (isPlainAttr(key, value)) {
        dom.setAttribute(key, value);
    }
};

function reconcileChildren(wipFiber, elements) {
    let index = 0
    let prevSibling = null

    while (
        index < elements.length
    ) {
        const element = elements[index]
        let newFiber = {
            type: element.type,
            props: element.props,
            dom: null,
            return: wipFiber,
            effectTag: "PLACEMENT",
        }

        if (index === 0) {
            wipFiber.child = newFiber
        } else if (element) {
            prevSibling.sibling = newFiber
        }

        prevSibling = newFiber
        index++
    }
}

function render(element, container) {
    wipRoot = {
        dom: container,
        props: {
            children: [element],
        }
    }
    nextFiberReconcileWork = wipRoot
}

requestIdleCallback(workLoop)

const Yc = {
    createElement,
    render
}