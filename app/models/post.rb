# frozen_string_literal: true

class Post < ApplicationRecord
  validates :post_name,
            presence: { accept: true, message: 'field is required' },
            length: { maximum: 20, message: 'length must be between 3 and 20 characters' },
            exclusion: { in: %w[asshole ass dickhead dick], message: ': Inappropriate word detected.' }
  validates :post_body,
            presence: true,
            length: { within: 5..200, too_long: 'text is too long', too_short: 'text is too short' }
end
