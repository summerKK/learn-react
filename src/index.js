import React from "react"
import ReactDom from "react-dom"
import {AppContainer} from "react-hot-loader";

import getRouter from "router/router"
import store from "./redux/store";
import {Provider} from "react-redux";

renderWithHotReload(getRouter())

if (module.hot) {
    module.hot.accept("./router/router", () => {
        const getRouter = require("router/router").default
        renderWithHotReload(getRouter())
    })
    module.hot.accept()
}

function renderWithHotReload(RootElement) {
    ReactDom.render(
        <AppContainer>
            <Provider store={store}>
                {RootElement}
            </Provider>
        </AppContainer>,
        document.getElementById("app")
    )
}
