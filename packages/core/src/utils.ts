import { ICommand } from "./types"

export const isCommand = (target: ICommand): target is ICommand => {
    return 'data' in target && 'execute' in target
}
