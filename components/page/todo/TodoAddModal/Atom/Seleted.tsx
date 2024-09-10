import { Text, TouchableOpacity } from "react-native"

import Color from "constant/color"
import Checkbox from "expo-checkbox"

interface SeletedType {
  state: boolean
  setState: (value: React.SetStateAction<boolean>) => void
  label: string
}

const Seleted = ({ state, setState, label }: SeletedType) => {
  return (
    <TouchableOpacity
      onPress={() => setState(!state)}
      className="items-center justify-center flex-row px-2 h-10 rounded-lg"
      style={[{ gap: 4 }, { backgroundColor: !state ? Color.slate100 : Color.slate900 }]}
    >
      <Checkbox
        value={state}
        color={Color.blue500}
        className="border-slate-200 w-[18] h-[18] rounded-md bg-white"
      />
      <Text
        className=" font-medium text-base"
        style={{
          color: !state ? Color.slate800 : "#fff",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default Seleted
