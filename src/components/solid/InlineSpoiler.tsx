import type { Component, JSXElement } from "solid-js";
import { createSignal, children, Show } from "solid-js";

import styles from "@styles/modules/solid/InlineSpoiler.module.css";

export type InlineSpoilerProps = {
    content_note: string | undefined;
    children: JSXElement;
};

export const InlineSpoiler: Component<InlineSpoilerProps> = (
    props: InlineSpoilerProps
) => {
    const safeChildren = children(() => props.children);
    const [status, setStatus] = createSignal<boolean>(false);
    return (
        <button
            class={styles.inline_spoiler}
            role="switch"
            aria-pressed={status()}
            aria-live="polite"
            aria-label="Spoiler"
            onClick={() => setStatus(!status())}
        >
            {" "}
            <span tabIndex={0}>
                <Show when={props.content_note} keyed>
                    <span>(CN: {props.content_note}) </span>
                </Show>
                <span class={styles.spoiler_text} aria-hidden={!status()}>
                    {safeChildren()}
                </span>
            </span>{" "}
        </button>
    );
};

export default InlineSpoiler;
