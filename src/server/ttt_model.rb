
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
 # DBL_COND = 
  def getMove(board, who)
    if who == "O" then opponent = "X" else opponent = "O" end
    rnd_strat = RandomStrategy.new
    puts "int: " + board.to_s
    count = 0

    board.each{ |val| count = count + ((val == 'n')?1:0)}

    # No Moves Available
    if count == 0 then return -1 end

    # Analyze Board for Tokens
    plays = Array.new
    WIN_COND.each{ |comb| tokens = Hash.new(0)
                   comb.each{ |index| tokens[board[index]] += 1}
                   plays.push(tokens) }
    

    puts "set:" + plays.to_s

    # Search for Plays that will Win
    moves = Array.new
    plays.each_with_index{ |play, i| 
                                     print play, " == " , play["n"], " == " , play[who]
                                     if play["n"] == 1 && play[who] == 2 then
                                       print "%% WIN %%\n"
                                       moves.push( {:cond => i, :move => WIN_COND[i].find_all{ |j| board[j] == "n"} } )
                                     end
                         }

    if moves.length != 0 then
      print "WIN\n"
      return moves.sample[:move] 
    end

    # Search for Plays that Opponent will Win
    moves = Array.new
    plays.each_with_index{ |play, i| 
                                     print play, " == " , play["n"], " == " , play[opponent]
                                     if play["n"] == 1 && play[opponent] == 2 then
                                       print "%% BLOCK %%\n"
                                       moves.push( {:cond => i, :move => WIN_COND[i].find_all{ |j| board[j] == "n"} } )
                                     end
                         }

    if moves.length != 0 then
      print "BLOCK\n"
      return moves.sample[:move] 
    end

    # Search for Double Wins

    
    # Default Moves
    if board[4] == "n" then
    #Center Move
      return 4
    elsif board[0] == "n" || board[2] == "n" || board[6] == "n" || board[8] == "n" then
    #Corner Moves
      tmp_board = board
      tmp_board[1] = "?"
      tmp_board[3] = "?"
      tmp_board[5] = "?"
      tmp_board[7] = "?"
      return rnd_strat.getMove(tmp_board, who)
    else
    #Edge Moves
      return rnd_strat.getMove(board, who)
    end
  end
end
    
    
