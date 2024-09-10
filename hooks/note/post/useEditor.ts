import { useState } from "react"

import { DEFAULT_TOOLBAR_ITEMS, useEditorBridge } from "@10play/tentap-editor"

const useEditor = () => {
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    onChange: async () => {
      const content = await editor.getText()

      const withSpaces = content.length
      const withoutSpaces = content.replace(/\s/g, "").length

      setCharCount({ withSpaces, withoutSpaces })
    },
  })

  const customToolbarItems = DEFAULT_TOOLBAR_ITEMS.filter((_, index) => index !== 2)

  const [charCount, setCharCount] = useState({ withSpaces: 0, withoutSpaces: 0 })

  return { editor, customToolbarItems, charCount }
}

export default useEditor
