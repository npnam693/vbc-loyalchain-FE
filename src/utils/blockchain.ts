import { IAsset } from '../state/user/userSlice'
import tokenData from '../contract/Token/data.json'
import { IUserState } from "../state/user/userSlice"
import { fixStringBalance } from "./string"
import { IToken } from "../state/app/appSlice"

const getBalanceToken = async (myWeb3: any, userState: IUserState, token: IToken) => {
    const tokenABI = tokenData.abi; // Thêm ABI của token vào đây
    const tokenContract = new myWeb3.eth.Contract(tokenABI, token.deployedAddress);
    let balance = await tokenContract.methods.balanceOf(userState.address).call(
        {from: userState.address}
    )
    const decimals = await tokenContract.methods.decimals().call({from: userState.address})
    
    balance = fixStringBalance(balance.toString(), Number(decimals))
    return {token, balance}
}


export const getBalanceAccount = async (myWeb3: any, userState: IUserState, tokenState: IToken[]) : Promise<IAsset[]> => {
    const tokensInMyNetwork = tokenState.filter((value) => value.network === userState.network)
    const newWallet : IAsset[] = Array(tokensInMyNetwork.length)
    return Promise.all(tokensInMyNetwork.map((token: IToken) => getBalanceToken(myWeb3, userState, token)))
}

export const getTokenInOtherNetwork = (tokenState: IToken[], userState: IUserState) => {
    const tokenInNetwork = userState.wallet.map((value) => value.token)
    const tokenInOtherNetwork = tokenState.filter((value) => {
        if (tokenInNetwork.includes(value)) return false
        else return true
    })
    return tokenInOtherNetwork;
}

export const mappingNetwork = (chainID: number) => {
    if (chainID === 8888) return "AGD Network"
    else if (chainID === 4444) return "MBC Testnet"
}

export const mappingCurrency = (chainID: number) => {
    if (chainID === 4444) return "MBC"
    else if (chainID === 8888) return "AGD"
}
