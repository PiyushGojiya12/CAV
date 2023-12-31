let arrival_time = [];
let burst_time = [];
let waiting_time = [];
let remaining_time = [];
let time_quantum ;
let turn_around_time = [];
let queue = [];
let complete = [];
let average_waiting_time = 0;
let average_turn_around_time = 0;
let total_waiting_time = 0;
let total_turn_around_time = 0;

for (let i = 0; i < 100; i++)
    remaining_time[i] = burst_time[i];

for(let i = 0; i < 100; i++){    
    complete[i] = false;
    queue[i] = 0;
}

function queueUpdation(n, maxProccessIndex){
        let zeroIndex;
        for(let i = 0; i < n; i++){
            if(queue[i] == 0){
                zeroIndex = i;
                break;
            }
        }  
        queue[zeroIndex] = maxProccessIndex + 1;
    }
     
function queueMaintainence(n){
        for(let i = 0; (i < n-1) && (queue[i+1] != 0) ; i++){
            let temp = queue[i];
            queue[i] = queue[i+1];
            queue[i+1] = temp;
        }
    }
     
function checkNewArrival(timer, n,  maxProccessIndex){
        if(timer <= arrival_time[n-1]){
           let newArrival = false;
           for(let j = (maxProccessIndex+1); j < n; j++){
                 if(arrival_time[j] <= timer){
                  if(maxProccessIndex < j){
                     maxProccessIndex = j;
                     newArrival = true;
                  }
               }
           }

           if(newArrival)
              queueUpdation(n, maxProccessIndex);
        }
    }
     
function compute()
{
        let timer = 0, maxProccessIndex = 0;
        let n = arrival_time.length;
        while(timer < arrival_time[0])    
            timer++;
        queue[0] = 1;
         
        while(true){
            let flag = true;
            for(let i = 0; i < n; i++){
                if(remaining_time[i] != 0){
                    flag = false;
                    break;
                }
            }
            if(flag)
                break;
     
            for(let i = 0; (i < n) && (queue[i] != 0); i++){
                let ctr = 0;
                while((ctr < time_quantum) && (remaining_time[queue[0]-1] > 0)){
                    remaining_time[queue[0]-1] -= 1;
                    timer += 1;
                    ctr++;
     
                  
                checkNewArrival(timer, n, maxProccessIndex);
                }
            
                if((remaining_time[queue[0]-1] == 0) && (complete[queue[0]-1] == false)){
                 
                    turn_around_time[queue[0]-1] = timer;       
                    complete[queue[0]-1] = true;
                }
                 
              
                let idle = true;
                if(queue[n-1] == 0){
                    for(let i = 0; i < n && queue[i] != 0; i++){
                        if(complete[queue[i]-1] == false){
                            idle = false;
                        }
                    }
                }
                else
                    idle = false;
     
                if(idle){
                    timer++;
                    checkNewArrival(timer,n, maxProccessIndex);
                }
           
                queueMaintainence(n);
            }
        }
     
        for(let i = 0; i < n; i++){
            turn_around_time[i] = turn_around_time[i] - arrival_time[i];
            waiting_time[i] = turn_around_time[i] - burst_time[i];
        }
     
        for(let i =0; i< n; i++){
            total_waiting_time += waiting_time[i];
            total_turn_around_time += turn_around__time[i];
        }
        average_waiting_time = total_waiting_time / n;
        average_turn_around_time = total_turn_around_time /n;
     
}
