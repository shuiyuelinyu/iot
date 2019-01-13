import os          #导入os模块，通过os模块调用系统命令
 
# Return CPU temperature as a character string
def getCPUtemperature():         #获取CPU温度
    res = os.popen('vcgencmd measure_temp').readline()
    return(res.replace("temp=","").replace("'C\n",""))
 
def getCPUtemperature_2(): 
    return os.popen('vcgencmd measure_temp').read()[5:9]
 
def getCPUtemperature_3():
    with open("/sys/class/thermal/thermal_zone0/temp") as tempFile:
        res = tempFile.read()
        res=str(float(res)/1000)
    return res
 
# Return RAM infomation(unit=kb) in a list
# Index 0: total RAM
# Index 1: used RAM
# Index 2: free RAM
def getRAMinfo():                                #内存使用情况
    p = os.popen('free')
    i = 0
    while 1:
        i = i+1
        line = p.readline()
        if i == 2:
            return(line.split()[1:4])
 
# Return % of CPU used by user as a character string
def getCPUuse():                                 #CPU占用情况
    return(str(os.popen("top -n1 | awk '/Cpu\(s\):/ {print $2}'").readline().strip()))
 
# Return information about disk space as a list (unit include)
# Index 0: total disk space
# Index 1: used disk space
# Index 2: remaining disk space
# Index 3: percentaage of disk used
def getDiskSpace():                              #硬盘使用情况
    p = os.popen("df -h /")
    i = 0
    while 1:
         i = i + 1
         line = p.readline()
         if i == 2:
             return(line.split()[1:5])
 
# CPU informaiton
CPU_temp = getCPUtemperature()
CPU_temp_2 = getCPUtemperature_2()
CPU_temp_3 = getCPUtemperature_3()
CPU_usage = getCPUuse()
 
# RAM information
# Output is in kb, here I convert it in Mb for readability
RAM_stats = getRAMinfo()
RAM_total = round(int(RAM_stats[0]) / 1000, 1)
RAM_used = round(int(RAM_stats[1]) / 1000, 1)
RAM_free = round(int(RAM_stats[2]) /1000, 1)
 
# Disk information
DISK_stats = getDiskSpace()
DISK_total = DISK_stats[0]
DISK_used = DISK_stats[1]
DISK_perc = DISK_stats[3]
 
if __name__ == '__main__':                 #显示树莓派温度、CPU使用情况、内存使用
#情况、硬盘使用情况

    print('')
    print('CPU Temperature = ' + CPU_temp)
    print('CPU Temperature = ' + CPU_temp_2)
    print('CPU Temperature = ' + CPU_temp_3)
    print('CPU Use = ' + CPU_usage)
 
    print('')
    print('RAM Total = ' + str(RAM_total) + ' MB')
    print('RAM Used = ' + str(RAM_used) + ' MB')
    print('RAM Free = ' + str(RAM_free) + ' MB')
 
    print('')
    print('DISK Total Space = ' + str(DISK_total) + 'B')
    print('DISK Used Space = ' + str(DISK_used) + 'B')
    print('DISK Used Percentage = ' + str(DISK_perc))
