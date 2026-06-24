# Sử dụng Nginx alpine phiên bản nhẹ, bảo mật
FROM nginx:alpine

# Xóa các file mặc định của Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copy toàn bộ source code hiện tại vào thư mục chạy của Nginx
COPY . /usr/share/nginx/html

# Copy file cấu hình custom vào Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Mở port 99
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
