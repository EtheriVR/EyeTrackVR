import { Select } from '@kobalte/core'
import { FaSolidCheck } from 'solid-icons/fa'
import { HiSolidSelector } from 'solid-icons/hi'
import { createSignal } from 'solid-js'
import { useAppAPIContext } from '@src/store/context/api'
import './styles.css'

export const FirmwareList = () => {
    const [firmwareVersion, setFirmwareVersion] = createSignal('')

    const { getFirmwareAssets, getFirmwareVersion } = useAppAPIContext()

    let defaultValue = ''
    let boardNames: string[] = []

    if (getFirmwareAssets) {
        defaultValue =
            getFirmwareAssets().find((item) => item.name === 'esp32AIThinker')?.name || ''
        boardNames = getFirmwareAssets().map((item) => item.name)
    }

    if (getFirmwareVersion) setFirmwareVersion(getFirmwareVersion())

    const [value, setValue] = createSignal(defaultValue)

    // TODO: call api to download firmware assets
    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault()
        console.log('[Firmware Select]: ', value())
    }

    return (
        <form onSubmit={handleSubmit}>
            <Select.Root
                name="board-select"
                value={value()}
                onValueChange={setValue}
                defaultValue={defaultValue}
                options={boardNames}
                placeholder="Select a board..."
                valueComponent={(props) => props.item.rawValue}
                itemComponent={(props) => (
                    <Select.Item item={props.item} class="select__item">
                        <Select.ItemLabel>{props.item.rawValue}</Select.ItemLabel>
                        <Select.ItemIndicator class="select__item-indicator">
                            <FaSolidCheck />
                        </Select.ItemIndicator>
                    </Select.Item>
                )}>
                <Select.Trigger class="select__trigger" aria-label="ESP_Boards">
                    <Select.Value class="select__value" />
                    <Select.Icon class="select__icon">
                        <HiSolidSelector />
                    </Select.Icon>
                </Select.Trigger>
                <Select.Description>Firmware - {firmwareVersion()}</Select.Description>
                <Select.Portal>
                    <Select.Content class="select__content">
                        <Select.Listbox class="select__listbox" />
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
            <div>
                <button type="reset">Reset</button>
                <button>Submit</button>
            </div>
        </form>
    )
}
