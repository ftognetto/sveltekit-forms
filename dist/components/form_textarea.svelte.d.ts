import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        name: string;
        label?: string | undefined;
        placeholder?: string | undefined;
        value?: string | number | '' | undefined;
        autocomplete?: boolean | undefined;
        disabled?: boolean | undefined;
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
        label: {
            error: string;
        };
        leading: {
            error: string;
        };
        trailing: {
            error: string;
        };
        error: {};
    };
};
export type FormTextareaProps = typeof __propDef.props;
export type FormTextareaEvents = typeof __propDef.events;
export type FormTextareaSlots = typeof __propDef.slots;
export default class FormTextarea extends SvelteComponentTyped<FormTextareaProps, FormTextareaEvents, FormTextareaSlots> {
}
export {};
