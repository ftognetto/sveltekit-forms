import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        name: string;
        label?: string | undefined;
        placeholder?: string | undefined;
        value?: string | number | '' | undefined;
        disabled?: boolean | undefined;
        options: {
            value: string | number;
            label: string;
        }[];
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
export type FormSelectProps = typeof __propDef.props;
export type FormSelectEvents = typeof __propDef.events;
export type FormSelectSlots = typeof __propDef.slots;
export default class FormSelect extends SvelteComponentTyped<FormSelectProps, FormSelectEvents, FormSelectSlots> {
}
export {};
