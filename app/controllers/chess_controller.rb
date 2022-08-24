class ChessController < ApplicationController
  def index
    @board = $arr
    File.open("#{Dir.pwd}/log/chess.txt", mode: 'w') do |file|
      file << @board[1][0][:piece]
    end
  end

  private

  BRk = { "piece": 'Rock_black', team: 'Blue' }.freeze
  BKn = { "piece": 'Knight_black', team: 'Blue' }.freeze
  BBi = { "piece": 'Bishop_black', team: 'Blue' }.freeze
  BKi = { "piece": 'King_black', team: 'Blue' }.freeze
  BQn = { "piece": 'Queen_black', team: 'Blue' }.freeze
  BPn = { "piece": 'Pawn_black', team: 'Blue' }.freeze

  RRk = { "piece": 'Rock_white', team: 'Red' }.freeze
  RKn = { "piece": 'Knight_white', team: 'Red' }.freeze
  RBi = { "piece": 'Bishop_white', team: 'Red' }.freeze
  RKi = { "piece": 'King_white', team: 'Red' }.freeze
  RQn = { "piece": 'Queen_white', team: 'Red' }.freeze
  RPn = { "piece": 'Pawn_white', team: 'Red' }.freeze

  $arr = Array.new 8, Array.new(8, '  ')

  $arr[0] = [BRk, BKn, BBi, BKi, BQn, BBi, BKn, BRk]
  $arr[1] = Array.new 8, BPn

  $arr[6] = Array.new 8, RPn
  $arr[7] = [RRk, RKn, RBi, RKi, RQn, RBi, RKn, RRk]

  TABLE = {
    A: '0',
    B: '1',
    C: '2',
    D: '3',
    E: '4',
    F: '5',
    G: '6',
    H: '7'
  }.freeze
end
