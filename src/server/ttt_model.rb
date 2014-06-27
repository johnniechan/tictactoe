
=begin
class tictactoeModel
	def initialize board strategy
		@board = board.new

=end


class RandomStrategy
  def getMove(board, who)
    count = 0
    board.each{ |val| count = count + ((val == 'n')?1:0)}
    puts count
    if count != 0 then
      v = rand(count)
      puts "Seek Box ##{v}"
  	
      for i in 0..8 do
        if board[i] == "n" then
          if v == 0 then
            return i
  	  else
  	    v -= 1
  	  end
        end
      end
    else
      return -1 
    end
  end
end

class PerfectStrategy
  WIN_COND = [[0,1,2], [3,4,5], [6,7,8],
              [0,3,6], [1,4,7], [2,5,8],
              [0,4,8], [2,4,6]]
  def getMove(board, who)
    rnd_strat = RandomStrategy.new
    count = 0
    board.each{ |val| count = count + ((val == 'n')?1:0)}
    array_set = Array.new
    WIN_COND.each{ |comb| c = 0
                   comb.each{ |index| (board[index] == who)?(c+=1;puts "c"):(next; puts "n")}
                   case c
                     when 3
                       break
                     when 2
                       array_set.push comb
                   end
                 }
    puts "set:" + array_set.to_s
    if !array_set.empty?
      choice = array_set.fetch rand(array_set.length)
      puts "choice: " + choice.to_s
    end
    if board[4] == "n" then
      return 4
    elsif board[0] == "n" || board[2] == "n" || board[6] == "n" || board[8] == "n" then
      tmp_board = board
      tmp_board[1] = "?"
      tmp_board[3] = "?"
      tmp_board[5] = "?"
      tmp_board[7] = "?"
      return rnd_strat.getMove(tmp_board, who)
    else
      return rnd_strat.getMove(board, who)
    end
  end
end
    
    
