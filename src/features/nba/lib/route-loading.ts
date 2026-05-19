const MIN_ROUTE_LOADING_MS = 850;

export function waitForRouteLoadingAnimation() {
    return new Promise<void>((resolve) => {
        setTimeout(resolve, MIN_ROUTE_LOADING_MS);
    });
}
