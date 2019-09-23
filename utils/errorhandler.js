export const errorHandler = error => {
  uni.showToast({
    title: error.message,
    icon: "none"
  });
};
