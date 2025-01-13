class ResizeObserverMock {
  callback: ResizeObserverCallback;
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element) {
    // Simulate an immediate callback invocation with mock entries
    this.callback([{ target } as ResizeObserverEntry], this);
  }

  unobserve() {
    // No-op
  }

  disconnect() {
    // No-op
  }
}

(global as any).ResizeObserver = ResizeObserverMock;
