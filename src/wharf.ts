import { BrowserLocalStorage, Session, SessionKit, type SerializedSession } from "@wharfkit/session";
import { WalletPluginAnchor } from "@wharfkit/wallet-plugin-anchor";
import WebUIRenderer from "@wharfkit/web-ui-renderer";
import { writable } from "svelte/store";

export const sessionKit = new SessionKit({
    appName: 'unicove',
    chains: [
        {
            id: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
            url: 'https://eos.greymass.com',
        },
    ],
    storage: new BrowserLocalStorage('demo'),
    ui: new WebUIRenderer(),
    walletPlugins: [
        new WalletPluginAnchor(),
    ],
})

export const session = writable<Session | undefined>()
export const sessions = writable<SerializedSession[]>([])