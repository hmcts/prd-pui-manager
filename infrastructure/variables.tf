variable "product" {}

variable "component" {}

variable "location" {
  default = "UK South"
}

variable "env" {}

variable "shared_product_name" {
    default = "rpx"
}

variable "subscription" {}

variable "common_tags" {
  type = map(string)
}

variable "application_type" {
  default     = "web"
  description = "Type of Application Insights (Web/Other)"
}


