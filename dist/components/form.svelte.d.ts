import { SvelteComponentTyped } from "svelte";
import { type SubmitFunction } from '$app/forms';
import type { ActionResult } from '@sveltejs/kit';
declare const __propDef: {
    props: {
        /**
             * The action of the form. Can be undefined
             */ action?: string | undefined;
        /**
             * The label to display into the default submit button.
             *
             * If the "submit" slot is overridden with custom content this property will not be used
             */ submitLabel?: string | undefined;
        /**
             * The form css class
             */ class?: string | undefined;
        /**
             * The footer css class.
             * Footer contains submit button
             */ footerClass?: string | undefined;
        /**
             * The submit button css class
             */ submitButtonClass?: string | undefined;
        /**
             * The generic error css class.
             */ errorClass?: string | undefined;
        /**
             * (Optional) If specified, this callback will be executed before form submitting.
             *
             * In the callback can also modify the ActionResult
             * @param The event that triggered the submit
             * @return void
             */ onBeforeSubmit?: ((data: FormData) => boolean | undefined) | undefined;
        /**
             * (Optional) If specified, this callback will be executed after a successful response from server side.
             *
             * In the callback can also modify the ActionResult
             * @param The successful `ActionResult` returned from the server
             * @return The `ActionResult` to apply
             */ onResult?: ((result: ActionResult) => void) | undefined;
        /**
             * (Optional) If specified, this callback will be executed after a successful response from server side.
             *
             * In the callback can also modify the ActionResult
             * @param The successful `ActionResult` returned from the server
             * @return The `ActionResult` to apply
             */ onSuccess?: ((result: Extract<ActionResult, {
            type: 'success';
        }>) => void) | undefined;
        /**
             * (Optional) If specified, this callback will be executed after a successful response from server side.
             *
             * In the callback can also modify the ActionResult
             * @param The successful `ActionResult` returned from the server
             * @return The `ActionResult` to apply
             */ onFailure?: ((result: Extract<ActionResult, {
            type: 'failure';
        }>) => void) | undefined;
        resetOnSuccess?: boolean | undefined;
        customEnhance?: SubmitFunction | undefined;
        /**
             * Controls whether the form is disabled or not.
             * This property disables the submit button.
             * Default: false
             */ disabled?: boolean | undefined;
        /**
             * Choose wheter automatically disable the UI when submitting
             * and re-enable it when the response is received
             * Default: true
             */ automaticallyDisableUi?: boolean | undefined;
        /**
             * Choose wheter to transform errors into fail responses
             * Default: true
             */ handleErrors?: boolean | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            errors: Record<string, string>;
        };
        error: {
            error: string;
        };
        otherActionsLeft: {
            submitting: boolean;
            busy: boolean;
        };
        submit: {
            submitting: boolean;
            busy: boolean;
        };
        submitting: {
            submitting: boolean;
            busy: boolean;
        };
        otherActionsRight: {
            submitting: boolean;
            busy: boolean;
        };
    };
};
export type FormProps = typeof __propDef.props;
export type FormEvents = typeof __propDef.events;
export type FormSlots = typeof __propDef.slots;
/**
 * A Form component that wraps the sveltekit form actions.
 * It automatically create a form with error and submit handling.
 * - You can use the input exported from this package like FormInput, FormRadio, FormSelect...
 * - You can execute async actions on succesful or invalid responses and also modify the ActionResult to be applied.
 * - Usage:
 *  ```tsx
 *  <Form
 * action="?/createUser"
 * submitLabel="Save"
 * onSuccess={async (_) => {
 * 	alert('User saved successfully!')
 * }}
 * >
 * ```
 */
export default class Form extends SvelteComponentTyped<FormProps, FormEvents, FormSlots> {
}
export {};
