<script>
    import {ethers} from 'ethers'
    import {onMount} from 'svelte'
    import {ethAccount} from './ethers'

    const provider =
        window.ethereum != null
            ? new ethers.providers.Web3Provider(window.ethereum, 'any')
            : ethers.providers.getDefaultProvider()

    async function connectWallet() {
        if (window.ethereum) {
            let networkId = await provider.getNetwork()
            if (networkId.chainId !== 17777) {
                await switchNetwork()
                networkId = await provider.getNetwork()
            }

            await window.ethereum.request({method: 'eth_requestAccounts'})
            const signer = provider.getSigner()
            ethAccount.set(await signer.getAddress())
        } else {
            alert('You need to install metamask')
        }
    }

    async function switchNetwork() {
        await window.ethereum
            .request({
                method: 'wallet_switchEthereumChain',
                params: [{chainId: '0x4571'}],
            })
            .catch(async (e) => {
                if (e.code === 4902) {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: '0x4571',
                                chainName: 'EOS EVM Network',
                                nativeCurrency: {name: 'EOS', symbol: 'EOS', decimals: 18},
                                rpcUrls: ['https://api.evm.eosnetwork.com/'],
                                blockExplorerUrls: ['https://explorer.evm.eosnetwork.com'],
                            },
                        ],
                    })
                }
            })
    }

    onMount(() => {
        connectWallet()
    })
</script>

<main>
    <div>Connected Account: {$ethAccount}</div>
    <button on:click={connectWallet}>Connect wallet</button>
</main>
