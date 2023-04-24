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
export type FormCheckboxProps = typeof __propDef.props;
export type FormCheckboxEvents = typeof __propDef.events;
export type FormCheckboxSlots = typeof __propDef.slots;
export default class FormCheckbox extends SvelteComponentTyped<FormCheckboxProps, FormCheckboxEvents, FormCheckboxSlots> {
}
export {};
