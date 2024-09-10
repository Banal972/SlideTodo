import { useEffect, useState } from "react"
import { Animated, Easing } from "react-native"

const SkeletonTodo = () => {
  const [opacityAnim] = useState(new Animated.Value(0.4))

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.4,
          duration: 700,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ]),
    ).start()
  }, [])

  return (
    <>
      {new Array(5).fill(0).map((_, i) => (
        <Animated.View
          key={i}
          className="w-full h-4 bg-gray-300"
          style={{ opacity: opacityAnim }}
        />
      ))}
    </>
  )
}

export default SkeletonTodo
