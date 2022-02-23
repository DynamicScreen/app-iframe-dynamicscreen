import {
    BaseContext,
    IAssetDownload,
    IAssetsStorageAbility,
    IGuardsManager,
    ISlideContext,
    IPublicSlide,
    SlideModule
} from "dynamicscreen-sdk-js";

import {onMounted, reactive, Ref, ref, VNode} from 'vue';
import { h } from "vue"

export default class IframeSlideModule extends SlideModule {
    constructor(context: ISlideContext) {
        super(context);
    }

    async onReady() {
        return true;
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