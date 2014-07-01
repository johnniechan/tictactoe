
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

  # Win Conditions
  WIN_COND = [[0,1,2], [3,4,5], [6,7,8],
              [0,3,6], [1,4,7], [2,5,8],
              [0,4,8], [2,4,6]]

  # Trap Locations
  DBL_COND = WIN_COND.combination(2).to_a.delete_if{ |cond| !(cond[1].include?(cond[0][0]) || cond[1].include?(cond[0][1]) || cond[1].include?(cond[0][2]))} 
  DBL_COMB = DBL_COND.map{ |cond| (cond[0] + cond[1])}
  TRAP_POINT = DBL_COMB.map.with_index{ |comb, i| comb.detect{ |box| DBL_COMB[i].count(box) > 1 } }
  DBL_COMB = DBL_COMB.map{ |comb| comb.uniq}

  puts TRAP_POINT.to_s
  puts DBL_COMB.to_s

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
    
    # Search for Plays that will Win
    moves = Array.new
    plays.each_with_index{ |play, i| 
                                     if play["n"] == 1 && play[who] == 2 then
                                       moves.push( {:cond => i, :move => WIN_COND[i].find_all{ |j| board[j] == "n"} } )
                                     end
                         }

    if moves.length != 0 then
      return moves.sample[:move] 
    end

    # Search for Plays that Opponent will Win
    moves = Array.new
    plays.each_with_index{ |play, i| 
                                     if play["n"] == 1 && play[opponent] == 2 then
                                       moves.push( {:cond => i, :move => WIN_COND[i].find_all{ |j| board[j] == "n"} } )
                                     end
                         }

    if moves.length != 0 then
      return moves.sample[:move] 
    end

    # Create Win Condition
   
    create = WIN_COND.select{ |cond| cond.count{ |box| board[box] == who } == 1 \
                                  && cond.count{ |box| board[box] == "n" } == 2 }


    # Search for Traps
    traps = TRAP_POINT.select.with_index{ |point, i| DBL_COMB[i].count{ |box| board[box] == opponent } == 2 \
                                                 && DBL_COMB[i].count{ |box| board[box] == "n" } == 3 \
                                                 && board[point] == "n"}

    create_cands = Array.new
    
    create.each{ |cond| create_cands += cond}
    create_cands.uniq!

    if create_cands != nil then
      create_cands.select!{ |cand| board[cand] == "n"}
    end

    puts "++" + create_cands.to_s

    both = create_cands & traps

    if !both.empty? then
      puts "Two birds" + both.to_s
      return both.sample
    end

    if !create.empty? then
      puts "Try to Win: " + create.to_s
      return create.sample.select{ |box| board[box] == "n"}.sample
    end
    if !traps.empty? then
      puts "Found Traps: " + traps.to_s
      return traps.sample
    end

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
    
    
