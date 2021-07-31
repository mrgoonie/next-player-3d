const isClient = !!(typeof window !== "undefined" && window.document && window.document.createElement);

const useIsClient = () => isClient;

export default useIsClient;
