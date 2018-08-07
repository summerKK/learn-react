import axios from "axios"

export default store => next => action => {
    const {dispatch, getState} = store
    //如果dispatch来的是一个function,此处不做处理,直接进入下一级
    if (typeof action == "function") {
        action(dispatch, getStater)
        return
    }

    //解析action
    const {
        promise,
        types,
        afterSuccess,
        ...rest
    } = action

    //没有promise,证明不是想要发送ajax请求的.
    if (!action.promise) {
        return next(action)
    }

    //解析types
    const [REQUEST, SUCCESS, FAILURE] = types

    //开始请求的时候,发一个action
    next({
        ...rest,
        type: REQUEST
    })

    //请求定义成功时的方法
    const onFulfilled = result => {
        next({
            ...rest,
            result,
            type: SUCCESS
        })
        if (afterSuccess) {
            afterSuccess(dispatch, getState, result)
        }
    }

    //请求失败的时方法
    const onRejected = error => {
        next({
            ...rest,
            error,
            type: FAILURE
        })
    }

    return promise(axios).then(onFulfilled, onRejected)
        .catch(error => {
            console.error("middleware error", error)
            onRejected(error)
        })
}