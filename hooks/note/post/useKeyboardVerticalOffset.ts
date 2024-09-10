import { useWindowDimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const useKeyboardVerticalOffset = () => {
  const { top } = useSafeAreaInsets()
  const { width, height } = useWindowDimensions()
  const isLandscape = width > height
  const headerHeight = isLandscape ? 32 : 44
  const keyboardVerticalOffset = headerHeight + top
  return { keyboardVerticalOffset }
}

export default useKeyboardVerticalOffset
