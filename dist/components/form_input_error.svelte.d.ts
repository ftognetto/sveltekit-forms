import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        name: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            error: string;
        };
    };
};
export type FormInputErrorProps = typeof __propDef.props;
export type FormInputErrorEvents = typeof __propDef.events;
export type FormInputErrorSlots = typeof __propDef.slots;
export default class FormInputError extends SvelteComponentTyped<FormInputErrorProps, FormInputErrorEvents, FormInputErrorSlots> {
}
export {};
