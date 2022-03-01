
import {
    ISlideOptionsContext,
    SlideOptionsModule, 
    VueInstance
  } from "dynamicscreen-sdk-js";
import debounce from "debounce";
import axios from "axios";


export default class IframeOptionsModule extends SlideOptionsModule {
    async onReady() {
        return true;
    };

    // @ts-ignore
    setup(props: Record<string, any>, vue: VueInstance, context: ISlideOptionsContext) {
        //@ts-ignore
        const { h, ref, reactive, watch, toRefs, toRef, computed } = vue;

        const update = context.update;

        const { Field, TextInput, Toggle } = this.context.components

        const url = toRef(props.modelValue, 'url') || ref<string>('');
        const isUrlValid = ref(true);

        watch(() => url.value, debounce((value) => {
            axios.get(value).then((response) => {
                isUrlValid.value = true;
            }).catch((err) => {
                console.log("ERROR", err)
                isUrlValid.value = false;
            })
        }, 500))

        return () =>
            h("div", { class: 'space-y-4' }, [
                h(Field, { label: this.t('modules.iframe.options.url') }, [
                    h(TextInput, {...update.option("url") }),
                    h("div", { class: isUrlValid.value ? "invisible" : "visible text-red-500 text-sm" }, this.t('modules.iframe.options.invalid_url'))
                ]),
                
                h(Field, {}, [
                    h(Toggle, { class: 'flex-1', ...update.option("refresh_content") }, this.t('modules.iframe.options.refresh_content'))
                ]),
            ])
    }
}
