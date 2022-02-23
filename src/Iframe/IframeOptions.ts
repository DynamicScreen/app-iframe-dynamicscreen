
   
import {
    ISlideOptionsContext,
    SlideOptionsModule, VueInstance
  } from "dynamicscreen-sdk-js";

export default class IframeOptionsModule extends SlideOptionsModule {
    constructor(context: ISlideOptionsContext) {
        super(context);
    }

    async onReady() {
        return true;
    };

    // @ts-ignore
    setup(props: Record<string, any>, vue: VueInstance, context: ISlideOptionsContext) {
        const { h } = vue;

        const update = context.update;

        const { Field, TextInput } = this.context.components

        console.log('in setup before return h')
        return () =>
            h("div", {}, [])
    }
}
