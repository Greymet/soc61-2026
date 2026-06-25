import cv2

image = cv2.imread('photo.jpg')

print(image.shape)

resized = cv2.resize(image, (640, 640))

gray = cv2.cvtColor(resized, cv2.COLOR_BGR2GRAY)

cropped = gray[50:200, 100:300]

cv2.imshow('Original', image)
cv2.imshow('Final Cropped output', cropped)

cv2.waitKey(0)
cv2.destroyAllWindows()