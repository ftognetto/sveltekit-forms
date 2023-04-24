import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        name: string;
        label?: string | undefined;
        placeholder?: string | undefined;
        type?: "number" | "text" | "date" | "datetime-local" | "email" | "password" | "file" | "url" | "tel" | undefined;
        value?: string | number | Date | '' | undefined;
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
export type FormInputProps = typeof __propDef.props;
export type FormInputEvents = typeof __propDef.events;
export type FormInputSlots = typeof __propDef.slots;
export default class FormInput extends SvelteComponentTyped<FormInputProps, FormInputEvents, FormInputSlots> {
}
export {};
