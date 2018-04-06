declare module 'popup' {
    interface PopupProps {
      show: boolean
      mask: boolean
      contWidth: number
      onRequestClose: Function
      model: string
    }

    const Popup: React.ComponentClass<PopupProps>
    export = Popup
}