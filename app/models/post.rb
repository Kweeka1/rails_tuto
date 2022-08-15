# frozen_string_literal: true
class Post < ApplicationRecord
  validates :post_name, presence: true, length: { minimum: 2 }
  validates :post_body, presence: true, length: { minimum: 10 }
end
