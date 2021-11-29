import {
    BaseContext,
    AssetDownload,
    IAssetsStorageAbility,
    IGuardsManager,
    ISlideContext,
    IPublicSlide,
    SlideModule
} from "dynamicscreen-sdk-js";

import i18next from "i18next";
import {SlideUpdateFunctions} from "../../../../../../../dynamicscreen-sdk-js/src/index";

const en = require("../../languages/en.json");
const fr = require("../../languages/fr.json");

type updateValue = (key: string) => { modelValue: any, "onUpdate:modelValue": (value: any) => void }

export default class IframeOptionsModule extends SlideModule {
    constructor(context: ISlideContext) {
        super(context);
    }

    trans(key: string) {
        return i18next.t(key);
    };

    async onReady() {
        return true;
    };

    onMounted() {
        console.log('onMounted weather OPTIONS')
    }

    //@ts-ignore
    onErrorTracked(err: Error, instance: Component, info: string) {
    }

    //@ts-ignore
    onRenderTriggered(e) {
    }

    //@ts-ignore
    onRenderTracked(e) {
    }

    onUpdated() {
        console.log('on updated')
    }

    initI18n() {
        i18next.init({
            fallbackLng: 'en',
            lng: 'fr',
            resources: {
                en: { translation: en },
                fr: { translation: fr },
            },
            debug: true,
        }, (err, t) => {
            if (err) return console.log('something went wrong loading translations', err);
        });
    };

    // @ts-ignore
    setup(props, ctx, update: SlideUpdateFunctions, OptionsContext) {
        const { h, reactive, ref } = ctx;

        const { Field, TextInput, ColorPicker } = OptionsContext.components

        console.log('in setup before return h')
        return () =>
            h("div", {}, [])
    }
}
