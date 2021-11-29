import {
    BaseContext,
    AssetDownload,
    IAssetsStorageAbility,
    IGuardsManager,
    ISlideContext,
    IPublicSlide,
    SlideModule
} from "dynamicscreen-sdk-js";

import {onMounted, reactive, Ref, ref, VNode} from 'vue';
import i18next from "i18next";
import { h } from "vue"

const en = require("../../../languages/en.json");
const fr = require("../../../languages/fr.json");

export default class IframeSlideModule extends SlideModule {
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
        console.log('onMounted')
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
    setup(props, ctx) {

        const slide = reactive(props.slide) as IPublicSlide;
        this.context = reactive(props.slide.context);

        const url = ref(slide.data.url);
        const autoRefresh = ref(slide.data.auto_refresh);
        const refreshTimeout = ref(0);

        const startTimeout = () => {
            if (!autoRefresh.value) {
                return;
            }
            clearTimeout(refreshTimeout.value)
            refreshTimeout.value = window.setTimeout(() => {
                refreshFrame();
            }, autoRefresh.value)
        }

        const refreshFrame = () => {
            const iframeTag = document.getElementById("iframe-id") as HTMLIFrameElement;
            if (iframeTag) {
                iframeTag.src = slide.data.url;
                startTimeout();
            }
        }

        this.context.onPrepare(async () => {

        });

        this.context.onReplay(async () => {
        });

        this.context.onPlay(async () => {
            startTimeout();
        });

        // this.context.onPause(async () => {
        //   console.log('Message: onPause')
        // });

        this.context.onEnded(async () => {
            clearTimeout(refreshTimeout.value)
        });

        return () =>
            h("div", {
                class: "flex w-full h-full"
            }, [
                h("iframe", {
                    id: "iframe-id",
                    width: "100%",
                    height: "100%",
                    src: url.value,
                    frameBorder: "0",
                    allowFullscreen: true,
                    allow: "geolocation; microphone; camera"
                })
            ])
    }
}