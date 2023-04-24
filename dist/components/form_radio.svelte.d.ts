import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        name: string;
        label?: string | undefined;
        checked?: boolean | undefined;
        disabled?: boolean | undefined;
        value?: string | number | undefined;
        containerClass?: string | undefined;
        inputContainerClass?: string | undefined;
        inputClass?: string | undefined;
        errorInputClass?: string | undefined;
        labelClass?: string | undefined;
        errorContainerClass?: string | undefined;
        error?: string | undefined;
    };
    events: {
        change: Event;
        input: Event;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        leading: {
            error: string;
        };
        label: {
            error: string;
        };
        trailing: {
            error: string;
        };
        error: {};
    };
};
export type FormRadioProps = typeof __propDef.props;
export type FormRadioEvents = typeof __propDef.events;
export type FormRadioSlots = typeof __propDef.slots;
export default class FormRadio extends SvelteComponentTyped<FormRadioProps, FormRadioEvents, FormRadioSlots> {
}
export {};
